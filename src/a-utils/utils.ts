function mergeObj(newObj, oldObj): {} {
  let _results = [],
      key: string,
      value,
      subkey: string,
      subvalue;
  for (key in newObj) {
    value = newObj[key];
    if (typeof value === "object") {
      if (oldObj[key] !== null) {
        _results.push((function() {
          let _results1;
          _results1 = [];
          for (subkey in value) {
            subvalue = value[subkey];
            _results1.push(oldObj[key][subkey] = subvalue);
          }
          return _results1;
        })());
      } else {
        _results.push(oldObj[key] = value);
      }
    } else {
      _results.push(oldObj[key] = value);
    }
  }
  return _results;
}

function datediff(fromDate: Date, toDateOut: Date) {
  // extract to https://github.com/dmfilipenko/datediff/blob/master/datediff.js
  if (!fromDate) throw new Error("Date should be specified");
  let startDate = new Date(1970, 0, 1, 0).getTime(),
      now = new Date(),
      toDate = toDateOut && toDateOut instanceof Date ? toDateOut : now,
      diff = toDate.valueOf() - fromDate.valueOf(),
      date = new Date(startDate + diff),
      years = date.getFullYear() - 1970,
      months = date.getMonth(),
      days = date.getDate() - 1,
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds(),
      diffDate = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

  if (years < 0) return diffDate;
  diffDate.years = years > 0 ? years : 0;
  diffDate.months = months > 0 ? months : 0;
  diffDate.days = days > 0 ? days : 0;
  diffDate.hours = hours > 0 ? hours : 0;
  diffDate.minutes = minutes > 0 ? minutes : 0;
  diffDate.seconds = seconds > 0 ? seconds : 0;
  return diffDate;
}

function setGlobalVariable(varname, value): GoogleAppsScript.Properties.Properties {
  return PropertiesService.getScriptProperties().setProperty(varname, JSON.stringify(value));
}

function getGlobalVariable(varname: string): string {
  return JSON.parse(PropertiesService.getScriptProperties().getProperty(varname));
}
