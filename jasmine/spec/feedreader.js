$(function() {


    describe('RSS Feeds', function() {

        it('All feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('All URL  present, defined and are strings', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toBe('string');
                expect(feed.url.length).not.toBe(0); 
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("All names present, defined and are strings", function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe('string');
            }
        });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* test to ensure menu is hidden by default */
        it('Menu hidden by default', function() {
            let hiddenMenu = $('body').hasClass('menu-hidden'); // returns true if body have a class menu-hidden
            expect(hiddenMenu).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it("Menu's visibility changes on click", function() {
            let toggleMenu = $('.menu-icon-link');

            toggleMenu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            toggleMenu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

    });

    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('Atleast a single element is in the feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);

        });

    });


    /*  A new test suite named "New Feed Selection" */
    describe('News Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let iniFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                iniFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('After load, different content', function() {
            expect($('.feed').html()).not.toBe(iniFeed);
        });

    });


}());