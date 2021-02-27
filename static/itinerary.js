$(document).ready(function () {
    // * Variables
    dayToDeleteID = 0
    eventToDeleteID = 0

    // * JQ Events

    // Final Add Day Modal Adder
    $(document).on(
        'click',
        'button[role="finalAddDayModalAdder"]',

        function (e) {
            $.ajax({
                url: "finalAddDayModalAdder",
                method: "GET",
                data: {
                    "name": $('#addDayModalNameInput').val(),
                    "description": $('#addDayModalDescriptionBox').val(),
                    "myInteneraryID": $('.InteneraryIdDiv').attr('id')
                },
                success: function (result) {
                    location.reload();
                }
            });
        }
    );
    // Day Events Modal Opener
    $(".dayEventsModalOpener").click(function () {
        $('#dayEventsModal').modal('show');
        $("#dayEventsModalTable tr").remove();
        $("#dayEventsModalTable th").remove();
        // myDayInfo = document.querySelector(this).id
        var myDayInfoElement = $(this).closest("div");
        var myDayInfo = $(myDayInfoElement).attr('id');
        console.log(myDayInfo)
        myDayInfo = myDayInfo.replace(/'/g, '"')
        myDayInfoDict = JSON.parse(myDayInfo)
        eventrows = myDayInfoDict.eventrows
        dayrow = myDayInfoDict.dayrow
        console.log(eventrows)
        $('.addEventButton').attr('id', dayrow[0]);
        $('#dayEventsModalTable').append("<tr><th>Event</th><th>Start</th><th>End</th><th></th></tr>")
        for (var i = 0; i < eventrows.length; i++) {
            myEventRow = eventrows[i]

            startTime = myEventRow[2]
            endTime = myEventRow[3]

            $('#dayEventsModalTable').append("<tr><td>" + myEventRow[1] + "</td><td>" + startTime + "</td><td>" + endTime + "</td><td id = '" + myEventRow[4] + "'><button type='button' class='btn btn-outline-danger' id = 'deleteEventButton'><i class='fa fa-trash' aria-hidden='true'></i></button></td></tr>")
            //$('#dayEventsModalTable').append("<tr><td>" + myEventRow[1] + "</td><td>" + startTime + "</td><td>" + endTime + "</td><td><div style='display: inline' id = '" + myEventRow[4] + "'></div><button type=\"button\" class=\"btn btn-success addEventButton\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button></td></tr>")

        }
        // $('#dayEventsModalTable').append('');
    });
    // Delete Day Modal Opener
    $(".deleteDayModalOpener").click(function () {
        $('#deleteDayModal').modal('show');

        var dayToDeleteInfoElement = $(this).closest("div");
        var dayToDeleteInfo = $(dayToDeleteInfoElement).attr('id');
        // dayToDeleteInfo = document.querySelector('.deleteDayModalOpener').id
        console.log(dayToDeleteInfo)
        dayToDeleteInfo = dayToDeleteInfo.replace(/'/g, '"')
        dayToDeleteInfoDict = JSON.parse(dayToDeleteInfo)
        dayToDeleteDayRow = dayToDeleteInfoDict.dayrow
        dayToDeleteID = dayToDeleteDayRow[0]
        console.log(dayToDeleteID)
    });
    // Final Day Deleter
    $(document).on(
        'click',
        'button[role="finalDayDeleterButton"]',

        function (e) {
            console.log('Javascript has recognized the clicking of the finalDayDeleterButton')
            $.ajax({
                url: "finalDayDelete",
                method: "GET",
                data: {
                    "dayToDeleteID": dayToDeleteID
                },
                success: function (result) {
                    location.reload()
                }
            });
        }
    );
    // Final Event Adder
    $(".finalEventAdder").click(function () {
        $('#addEventModal').modal('show');
        timeStartedUnconverted = $('#eventDayStartTimeInput').val()
        timeEndedUnconverted = $('#eventDayEndTimeInput').val()

        // Time Started Conversion

        timeStartedUnconvertedStartSubstring = parseInt(timeStartedUnconverted.substring(0, 2))
        timeStartedEndSubstring = timeStartedUnconverted.substring(3)
        if (timeStartedUnconvertedStartSubstring > 12) {
            timeStartedConvertedStartSubstring = timeStartedUnconvertedStartSubstring - 12
            console.log("timeStartedConvertedStartSubstring: " + (timeStartedConvertedStartSubstring))
            timeStartedConverted = (timeStartedConvertedStartSubstring) + ':' + timeStartedEndSubstring + " PM"
        } else if ((timeStartedUnconvertedStartSubstring < 12)) {
            timeStartedConverted = timeStartedUnconverted + " AM"
            timeStartedConverted = timeStartedConverted.substring(1)
        }

        // Time Ended Conversion

        timeEndedUnconvertedStartSubstring = parseInt(timeEndedUnconverted.substring(0, 2))
        timeEndedEndSubstring = timeEndedUnconverted.substring(3)
        if (timeEndedUnconvertedStartSubstring > 12) {
            timeEndedConvertedStartSubstring = timeEndedUnconvertedStartSubstring - 12
            console.log("timeEndedConvertedStartSubstring: " + (timeEndedConvertedStartSubstring))
            timeEndedConverted = (timeEndedConvertedStartSubstring) + ':' + timeEndedEndSubstring + " PM"
        } else if ((timeEndedUnconvertedStartSubstring < 12)) {
            timeEndedConverted = timeEndedUnconverted + " AM"
            timeEndedConverted = timeEndedConverted.substring(1)
        }

        $.ajax({
            url: "addEvent",
            method: "GET",
            data: {
                "dayid": document.querySelector('.addEventButton').id,
                "eventType": $('#eventDayTypeTextInput').val(),
                "timeStarted": timeStartedConverted,
                "timeEnded": timeEndedConverted
            },
            success: function (result) {
                location.reload()
            }
        });
    });
    // Add Event Button
    $(".addEventButton").click(function () {
        $('#addEventModal').modal('show');
    });
    // Delete Event Button
    $('#dayEventsModalTable').on(
        'click',
        '#deleteEventButton',

        function () {
            console.log('Now opening deleteEventModal')
            eventToDeleteInfoElement = $(this).closest("td");
            eventToDeleteID = eventToDeleteInfoElement.attr('id');

            console.log(eventToDeleteInfoElement)
            console.log(eventToDeleteID)

            $('#deleteEventModal').modal('show');
        }
    );
    // Final Delete Event Button
    $(document).on(
        'click',
        '#finalEventDeleterButton',

        function () {
            console.log('Now opening FinaldeleteEventModal')
            $.ajax({
                url: "finalEventDelete",
                method: "GET",
                data: {
                    "eventToDeleteID": eventToDeleteID
                },
                success: function (result) {
                    location.reload()
                }
            });
        }
    );
});


//* Ajax Template:
// $(document).on(
//     'click',
//     'button[role="ADD ROLE HERE"]', //! Add Role Here

//     function (e) {
//         $.ajax({
//             url: "ADD URL HERE", //! Add URL Here
//             method: "GET",
//             data: {
//                 "val" : "ADD VAL HERE" //! Add Vals Here
//             },
//             success: function (result) {
//                 location.reload() //! Do Something
//             }
//         });
//     }
// );