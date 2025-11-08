export type HostKey = 'archive' | 'http' | 'stats' | 'query';

export type HostRegistry = Record<HostKey, string>;

export const DEFAULT_HOSTS: HostRegistry = {
  archive: 'https://rpc.qubic.org',
  http: 'https://rpc.qubic.org',
  stats: 'https://rpc.qubic.org',
  query: 'https://api.qubic.org'
};
