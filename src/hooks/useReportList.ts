import { filteredList } from '@utils/filteredList';
import { ReportScheduleMonitorProps, ReportScheduleFrequencyAndUser } from 'src/@types/report-schedule';

import useFetch from './useFetch';

export interface ReportListHookProps {
  companys: ReportScheduleMonitorProps[];
  running: { id: string; name: string; data: ReportScheduleFrequencyAndUser[] }[];
  done: { id: string; name: string; data: ReportScheduleFrequencyAndUser[] }[];
  error: { id: string; name: string; data: ReportScheduleFrequencyAndUser[] }[];
  notStatus: { id: string; name: string; data: ReportScheduleFrequencyAndUser[] }[];
  all: { id: string; name: string; data: ReportScheduleFrequencyAndUser[] }[];
}

interface ValuesStatusProps {
  running: ReportScheduleFrequencyAndUser[];
  error: ReportScheduleFrequencyAndUser[];
  done: ReportScheduleFrequencyAndUser[];
  notStatus: ReportScheduleFrequencyAndUser[];
}

function separateReportWithStatus(schedules?: ReportScheduleMonitorProps[]) {
  if (schedules) {
    return schedules?.map((schedule) => {
      const { id, name, users } = schedule;

      const values = users
        ?.map((user) => {
          const dataRunning = user.frequency.filter((freq) => freq.status === 'RUNNING');
          const dataError = user.frequency.filter((freq) => freq.status === 'ERROR');
          const dataDone = user.frequency.filter((freq) => freq.status === 'DONE');
          const dataNotStatus = user.frequency.filter((freq) => freq.status === null);

          const running: ReportScheduleFrequencyAndUser[] = dataRunning.length
            ? [...dataRunning.map((freq) => ({ user: { panelname: user.panelname, ...user.user }, ...freq }))]
            : [];
          const done: ReportScheduleFrequencyAndUser[] = dataDone.length
            ? [...dataDone.map((freq) => ({ user: { panelname: user.panelname, ...user.user }, ...freq }))]
            : [];
          const error: ReportScheduleFrequencyAndUser[] = dataError.length
            ? [...dataError.map((freq) => ({ user: { panelname: user.panelname, ...user.user }, ...freq }))]
            : [];

          const notStatus = dataNotStatus.length
            ? [...dataError.map((freq) => ({ user: { panelname: user.panelname, ...user.user }, ...freq }))]
            : [];

          return { running, done, error, notStatus };
        })
        .reduce(
          (accum, curr) => ({
            running: [...curr?.running, ...(accum?.running || [])],
            done: [...curr?.done, ...(accum?.done || [])],
            error: [...curr?.error, ...(accum?.error || [])],
            notStatus: [...curr?.notStatus, ...(accum?.notStatus || [])],
          }),
          {} as ValuesStatusProps,
        );

      return { id, name, data: values || [] };
    });
  }

  return [];
}

function useReportList(search: string): ReportListHookProps {
  const { data: reports } = useFetch<ReportScheduleMonitorProps[]>(`report-schedule`, {
    suspense: true,
    loadingTimeout: 60000,
  });

  const filteredReports = filteredList(reports || [], search);

  const datas = separateReportWithStatus(filteredReports);

  const statusIndividual = (status: typeof datas, type: 'done' | 'error' | 'running' | 'notStatus') => {
    return status.map((data) => {
      const { id, name, data: value } = data;

      const values = value[type];

      return { id, name, data: values };
    });
  };

  const all = datas.map((status) => {
    const { id, name, data } = status;

    return { id, name, data: [...data.error, ...data.running, ...data.done, ...data.notStatus] };
  });

  const done = statusIndividual(datas, 'done');

  const running = statusIndividual(datas, 'running');

  const error = statusIndividual(datas, 'error');

  const notStatus = statusIndividual(datas, 'notStatus');

  return { companys: reports || [], done, running, error, notStatus, all };
}

export default useReportList;
