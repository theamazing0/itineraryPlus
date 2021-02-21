$(document).ready(function () {
    // * Variables
    dayToDeleteID = 0

    // * JQ Events

    // Add Modal Opener
    $(".addModalOpener").click(function () {
        console.log('addModalOpened')
        $.ajax({
            url: "getuniqueid",
            method: "GET",
            data: {
                "givemethenextid": "true"
            },
            success: function (result) {
                console.log(result)
                console.log('It got to changing the add id label')
                $('#uniqueIdAddLabel').html(result);
                console.log('its done')
            }
        });
    });
    // Final Add Button
    $(document).on(
        'click',
        'button[role="finaladdbutton"]',

        function (e) {
            $.ajax({
                url: "finaladdbutton",
                method: "GET",
                data: {
                    "name": $('#itinerarynameinput').val()
                },
                success: function (result) {
                    document.location.href = "/itinerary";
                }
            });
        }
    );
    // Final Open Model Opener
    $(document).on(
        'click',
        'button[role="finalOpenModalOpener"]',

        function (e) {
            $.ajax({
                url: "finalOpenModalOpener",
                method: "GET",
                data: {
                    "id": $('#openModalOpenThisId').val()
                },
                success: function (result) {
                    document.location.href = "/itinerary";
                }
            });
        }
    );
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
                    "myInteneraryID": $('#InteneraryIdLabel').html()
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
        $('#dayEventsModalTable').append("<tr><th>Event</th><th>Start</th><th>End</th></tr>")
        for (var i = 0; i < eventrows.length; i++) {
            myEventRow = eventrows[i]

            startTime = myEventRow[2]
            endTime = myEventRow[3]

            $('#dayEventsModalTable').append("<tr><td>" + myEventRow[1] + "</td><td>" + startTime + "</td><td>" + endTime + "</td></tr>")
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
    // TODO Add Delete Event Functionality
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