### version 0.3.3-pre-alpha

- Added method to WeatherService to get weather by user location;
- Added method to WeatherController to get weather by user location;

### version 0.3.2-pre-alpha

- Moved tag fetching with GeminiService from WeatherController to LastFmController;
- Added method to LastFmController that gets tags from frontend and fetch tracks;
- Modified GeminiService to return only tags string (it returned full gemini response stringified before);

### version 0.3.1-pre-alpha

- Added custom exceptions classes for handling errors in services and controllers;
- Modified controllers and services to try and catch exceptions and return error messages to the frontend;

## version 0.3.0-pre-alpha

- Created service to work with Gemini API;
- Modified WeatherController to work with GeminiService;
- Added caching for tags to work with hem in different controllers and be sure that delays in execution will not affect the result

### version 0.2.1-pre-alpha

- "Removed" unused method from LastFmService and LastFmController;
- Updated models props, so part of them are nullable and part of them are required;

## version 0.2.0-pre-alpha

- Created class-model for music data;
- Created service to receive and process music data from Last.fm API;
- Created controller to send music data to the frontend;

## version 0.1.0-pre-alpha

- Created class-model for weather data;
- Created service to receive and process weather data;
- Created controller to send weather data to the frontend;