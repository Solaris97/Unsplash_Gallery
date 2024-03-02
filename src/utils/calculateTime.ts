//NOTE - 업로드 된 일자와 현재 일자를 비교하여 그 차이를 return
export const calculateTimeDifference = (createdDate: Date) => {
  const createdAt: Date = new Date(createdDate);
  const now: Date = new Date();
  const differenceInMilliseconds: number = now.getTime() - createdAt.getTime();
  const millisecondsPerDay: number = 24 * 60 * 60 * 1000;
  const millisecondsPerMonth: number = 30 * 24 * 60 * 60 * 1000;
  const millisecondsPerYear: number = 365 * 24 * 60 * 60 * 1000;

  if (differenceInMilliseconds < millisecondsPerDay) {
    return "오늘 게시됨";
  } else if (differenceInMilliseconds < millisecondsPerMonth) {
    const daysAgo = Math.floor(differenceInMilliseconds / millisecondsPerDay);
    return `${daysAgo}일 전 게시됨`;
  } else if (differenceInMilliseconds < millisecondsPerYear) {
    const monthsAgo = Math.floor(
      differenceInMilliseconds / millisecondsPerMonth
    );
    return `${monthsAgo}달 전 게시됨`;
  } else {
    const yearsAgo = Math.floor(differenceInMilliseconds / millisecondsPerYear);
    return `${yearsAgo}년 전 게시됨`;
  }
};
