export interface MetricsRecorder {
  record(metric: string, value?: number, tags?: Record<string, string>, fields?: Record<string, unknown>): void;
}

const noopRecorder: MetricsRecorder = {
  record() {
    // noop
  }
};

export const createMetricsRecorder = (recorder?: Partial<MetricsRecorder>): MetricsRecorder => ({
  record: recorder?.record ?? noopRecorder.record
});
