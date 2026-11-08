/* Check the registration fields using jQuery. */
function validate() {
    var sid = $("#sid").val();
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    var uname = $("#uname").val();
    var genm = $("#genm").prop("checked");
    var genf = $("#genf").prop("checked");

    var errMsg = "";
    var result = true;
    var pattern = /^[a-zA-Z ]+$/;

    /* Required fields. */
    if (sid == "") {
        errMsg += "<li>User ID cannot be empty.</li>";
    }
    if (pwd1 == "") {
        errMsg += "<li>Password cannot be empty.</li>";
    }
    if (pwd2 == "") {
        errMsg += "<li>Retype password cannot be empty.</li>";
    }
    if (uname == "") {
        errMsg += "<li>User name cannot be empty.</li>";
    }
    if ((!genm) && (!genf)) {
        errMsg += "<li>A gender must be selected.</li>";
    }

    /* The lab's basic User ID check. */
    if (sid.indexOf("@") == 0) {
        errMsg += "<li>User ID cannot start with an @ symbol.</li>";
    }
    if (sid.indexOf("@") < 0) {
        errMsg += "<li>User ID must contain an @ symbol.</li>";
    }

    /* Matching passwords. */
    if (pwd1 != pwd2) {
        errMsg += "<li>Passwords do not match.</li>";
    }

    /* Letters and spaces only. */
    if (!uname.match(pattern)) {
        errMsg += "<li>User name contains symbols.</li>";
    }

    /* Show all errors in one window instead of an alert. */
    if (errMsg != "") {
        var previousFocus = document.activeElement;
        var numOfItems = errMsg.match(/<li>/g).length + 6;

        errMsg = "<div id='scrnOverlay'></div>"
            + "<section id='errWin' class='window' role='alertdialog'"
            + " aria-modal='true' aria-label='Registration errors'"
            + " aria-describedby='errorList'>"
            + "<ul id='errorList'>" + errMsg + "</ul>"
            + "<div class='buttonrow'>"
            + "<a href='#' id='errBtn' class='button' role='button'>Close</a>"
            + "</div></section>";

        /* Keep the overlay and window inside the body. */
        $("#scrnOverlay, #errWin").remove();
        $("body").prepend(errMsg);
        $("#scrnOverlay").css("visibility", "visible");
        $("#errWin").css("height", numOfItems.toString() + "em");
        $("#errWin").css("margin-top", (numOfItems / -2).toString() + "em");
        $("#errWin").show();
        $("#errBtn").trigger("focus");

        $("#errBtn").click(function () {
            $("#scrnOverlay, #errWin").remove();
            $(previousFocus).trigger("focus");
            return false;
        });

        /* Keep keyboard focus in the window until it is closed. */
        $("#errWin").keydown(function (event) {
            if (event.key == "Escape" || event.key == " ") {
                event.preventDefault();
                $("#errBtn").trigger("click");
            } else if (event.key == "Tab") {
                event.preventDefault();
                $("#errBtn").trigger("focus");
            }
        });

        result = false;
    }

    return result;
}

/* Slide the following fieldset open or closed. */
function toggle() {
    var section = $(this).parent().next();
    var isExpanded = $(this).html() == "[-]";

    section.stop(true, true).slideToggle();
    $(this).html(isExpanded ? "[+]" : "[-]");
    $(this).attr("aria-expanded", isExpanded ? "false" : "true");
    $(this).attr("aria-label", (isExpanded ? "Expand " : "Collapse ")
        + section.children("legend").text().toLowerCase());

    return false;
}

/* Connect the form and collapse controls after the document is ready. */
function init() {
    $(".collapse").click(toggle);
    $(".collapse").keydown(function (event) {
        if (event.key == " ") {
            event.preventDefault();
            $(this).trigger("click");
        }
    });
    $("#regform").submit(validate);
}

$(document).ready(init);
