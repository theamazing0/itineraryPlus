$(document).ready(function () {
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
                    document.location.href="/itinerary"; 
                }
            });
        }
    );
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
    $(".dayEventsModalOpener").click(function () {
        $('#dayEventsModal').modal('show');
        myDayInfo = document.querySelector('.dayEventsModalOpener').id
        console.log(myDayInfo)
        myDayInfo = myDayInfo.replace(/'/g, '"')
        myDayInfoDict = JSON.parse(myDayInfo)
        eventrows = myDayInfoDict.eventrows
        console.log(eventrows)
        for (var i = 0; i < eventrows.length; i++) {
            myEventRow = eventrows[i]

            startTimeM = myEventRow[2]
            endTimeM = myEventRow[3]

            startTime = startTimeM.substring(0, 2) + ':' + startTimeM.substring(2)
            endTime = endTimeM.substring(0, 2) + ':' + endTimeM.substring(2)
            $('#dayEventsModalTable').append("<tr><th>Event</th><th>Start</th><th>End</th></tr><tr><td>" + myEventRow[1] + "</td><td>" + startTime + "</td><td>" + endTime + "</td></tr>")
        }
        // $('#dayEventsModalTable').append('');
    });
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