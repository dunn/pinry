/**
 * Bookmarklet for Pinry
 * Descrip: This is trying to be as standalone a script as possible hence
 *          why it has built in helpers and such when the rest of the
 *          scripts make use of helpers.js. In the future i want to remove
 *          all dependencies on jQuery.
 * Authors: Pinry Contributors
 * Updated: Feb 26th, 2013
 * Require: None (dynamically loads jQuery if needed)
 */


// Start jQuery Check
if (!window.jQuery) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.src = '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js';
    head.appendChild(script);
}
// End jQuery Check


$(document).ready(function() { 
    // Start Helper Functions
    function getFormUrl() {
        var hostUrl = $('#pinry-bookmarklet').attr('src').split('/')[2];
        var formUrl = '/pins/pin-form/?pin-image-url=';
        return 'http://'+hostUrl+formUrl;
    }

    function normalizeImageUrl(imageUrl) {
        var protocol = imageUrl.split(':')[0];
        if (protocol != 'http' && protocol != 'https') {
            if (imageUrl[1] != '/')
                imageUrl = 'http://'+window.location.host+imageUrl;
        }
        return imageUrl;
    }
    // End Helper Functions


    // Start View Functions
    function pageView() {
        var pinryImages = document.createElement('div');
        pinryImages.id = 'pinry-images';
        $(pinryImages).css({
            'position': 'absolute',
            'z-index': '9001',
            'background': 'rgba(0, 0, 0, 0.7)',
            'top': '0',
            'left': '0',
            'right': '0',
            'height': $(document).height()
        });
        return $('body').append(pinryImages);
    }

    function imageView(imageUrl) {
        // Requires that pageView has been created already
        imageUrl = normalizeImageUrl(imageUrl);
        var image = document.createElement('div');
        $(image).css({
            'background-image': 'url('+imageUrl+')',
            'background-position': 'center center',
            'background-repeat': 'no-repeat',
            'display': 'inline-block',
            'width': '200px',
            'height': '200px',
            'margin': '15px',
            'cursor': 'pointer'
        });
        $(image).click(function() {
            var popUrl = getFormUrl()+imageUrl;
            window.open(popUrl, '', 'width=590,height=439,toolbar=0,menubar=0');
            $('#pinry-images').remove();
        });
        return $('#pinry-images').append(image);
    }
    // End View Functions


    // Start Active Functions
    function addAllImagesToPageView() {
        var images = $('body').find('img');
        images.each(function() {
            imageView($(this).attr('src'));
        });
        return images;
    }
    // End Active Functions


    // Start Init
    pageView(); // Build page before we insert images
    addAllImagesToPageView(); // Add all images on page to our new pageView
    // End Init
});
