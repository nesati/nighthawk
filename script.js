function initHideText() {
    $(".toggleHide").click(function () {
        $(".elementToHide").slideToggle("fast");
        $(this).find("i").toggleClass("down up");
    });
}
