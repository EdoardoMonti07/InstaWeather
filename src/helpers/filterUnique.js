function filterUnique(arr, compEl, excCompEl = "") {
  const uniqueIds = [];
  return arr.filter((item) => {
    // Concatenate the values of compEl and excCompEl, and then convert to string
    const uniqueKey = `${item[compEl]}${item[excCompEl]}`;
    if (!uniqueIds.includes(uniqueKey)) {
      uniqueIds.push(uniqueKey);
      return true;
    }
    return false;
  });
}

export default filterUnique;
