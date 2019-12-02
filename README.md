# Unit 06 Server-Side APIs Homework: Weather Dashboard

For this week's homework we were tasked with developing a dashboard that would
call on multiple APIs to create a layout that gave us current and future weather
data for cities searched.

## Application Features

After completing your first city search current and future weather data is
displayed on the screen, and the city searched is added to your recent cities on
the left hand side of the page. The last searched for city information is stored
in localStorage, allowing you to refresh the page and still have the previously
searched cities displayed as well as the previous city weather information still
displayed on the page. Additionally, if you search for a city multiple times it
will only be added to the search history once.

## Future Changes

There are a couple of things I would like to update in the future on this
application:

- Calling up local weather upon document's first load: because the window
  information tied to this is in lon/lat rather than city name information, I
  would have to write a completely new way of performing city search on the
  page's first load. With the time crunch I decided that this would have to be
  completed at a later date.

- Creating layout elements dynamically, rather than having them available to be
  appended to on first search: because the local weather does not appear on
  first load, the landing page looks sloppy until you've searched for your first
  city.

## Link To Application

https://missjody.github.io/Weather-Dashboard/

## License

MIT License

Copyright (c) 2019 Jody Russell

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
