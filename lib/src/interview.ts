export function getProcessedData(
  yearOneData: any,
  yearTwoData: any,
  yearThreeData: any
) {
  // TODO:
  // 1. Remove data items that has reporting rate less than 50
  // 2. Combine relevant data (data of the same code) from each year inorder to compute average
  // 3. Compute average for the combined data to arrive to single value (average value)
  // 4. Return the averaged data as final output
  /***
   * [
      {
        value: 43,
        name: 'Number of members registered',
        code: 'MEMBER_REGISTERED',
      },
      {
        value: 17,
        name: 'Number of active members',
        code: 'ACTIVE_MEMBERS',
      },
    ]
   */

  /* 1. Merge all data set into one and filter for reporting rate less than 50*/
  const allYearsData = ([].concat(yearOneData, yearTwoData, yearThreeData))
    .filter(data => data.reportingRate >= 50);

  /* 2. Combining relevant data (data of the same code) from each year inorder to compute average*/
  const combinedRelevantData: any = {
    MEMBER_REGISTERED: { sumOfValues: 0, numOfValues: 0, name: '' },
    ACTIVE_MEMBERS: { sumOfValues: 0, numOfValues: 0, name: '' }
  };

  allYearsData.forEach(data => {
    const dataSet = combinedRelevantData[`${data.code}`];
    dataSet.sumOfValues += data.value;
    dataSet.numOfValues += 1;
    dataSet.name = data.name;
  })

  /* 3. Computing average for the combined data to arrive to single value (average value) */

  const computedAvarages: Array<any> = [];

  Object.keys(combinedRelevantData).forEach(key => {
    const dataSet = combinedRelevantData[key];
    computedAvarages.push({
      value: dataSet.sumOfValues / dataSet.numOfValues,
      name: dataSet.name,
      code: key
    })
  })
  return computedAvarages;
}
