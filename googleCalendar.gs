function doGet(request) {
  var calendarId = 'lu4j68df0aal3u6dtblqeijkfs@group.calendar.google.com';
  var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime'
  };
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      var ending = event.end.dateTime;
      if (!when) {
        when = event.start.date;
      }
      Logger.log('%s: %s  -  %s', event.summary, when, ending);
    }
  } else {
    Logger.log('No upcoming events found.');
  }
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
