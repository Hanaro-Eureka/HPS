export function parseKSTDateFromDtime(dtime: string): Date {
  const Y = Number(dtime.slice(0, 4));
  const M = Number(dtime.slice(4, 6)) - 1; // JS month: 0-based
  const D = Number(dtime.slice(6, 8));
  const h = Number(dtime.slice(8, 10));
  const m = Number(dtime.slice(10, 12));
  const s = Number(dtime.slice(12, 14));

  // Date.UTC는 UTC 기준으로 Date 객체 생성
  return new Date(Date.UTC(Y, M, D, h, m, s));
}
