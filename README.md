reflow-timer
============

A lil Phonegap app which will run an old-school attempt to test
render timing in the webview.

Inspired to gather some data by
http://sealedabstract.com/rants/why-mobile-web-apps-are-slow/


Android
--------

To build to your USB connected device:

```bash
cd android
ant debug
ant installd
```


iPhone
-------

To build to your device (please don't do it in the SIM).

```bash
cd ios;
open ReflowTimer.xcodeproj
```

You should know what to do from there =)


Open it in a browser on your box
---------------------------------

```bash
file:///path/to/reflow-timer/android/assets/www/index.html
```
