function Event(name, startDate, endDate, description){
  this.name = name,
  this.startDate = startDate,
  this.endDate = endDate,
  this.description = description,

  this.getDay = function(beginEnd){
    if(beginEnd == "begin"){
      return this.returnSubstring(this.startDate, 8,2);
    }
    else{
      return this.returnSubstring(this.endDate, 8,2);
    }
  },
  this.getMonth = function(beginEnd){
    if(beginEnd == "begin"){
      return this.returnSubstring(this.startDate, 5,2);
    }
    else{
      return this.returnSubstring(this.endDate, 5,2);
    }
  },
  this.getHour = function(beginEnd){
    if(beginEnd == "begin"){
      return this.returnSubstring(this.startDate, 11,2);
    }
    else{
      return this.returnSubstring(this.endDate, 11,2);
    }
  },
  this.getMinute = function(beginEnd){
    if(beginEnd == "begin"){
      return this.returnSubstring(this.startDate, 14,2);
    }
    else{
      return this.returnSubstring(this.endDate, 14,2);
    }
  },

  this.returnSubstring =function(dateString, start, end){
    var returnVal = dateString.substr(start, end);
    return returnVal;
  }
}

/*
 name,
 Day,
 Month,
 Hour,
 Minute,


 this.getDay = function(beginEnd){
   if(beginEnd == begin){
     return this.returnSubstring(this.startDate, 8,2);
   }
   else{
     return this.returnSubstring(this.endDate, 8,2);
   }
 },


 var today = openData.items[openNext[0]].start.dateTime;

 var beginOf = today.substr(8, 2);
 var openingHours = today.substr(11,2);
 var closingHours = openData.items[openNext[0]].end.dateTime.substr(11,2);

 */
