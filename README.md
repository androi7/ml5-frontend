# Face Filter APP
### In Production

## Description
Under *Video* you can take a selfie with a predefinied filter. The photo is saved in your gallery and you can chat with others and share your photos with them.

## Important Note 
You have to enable your webcam.
The page is still under construction and so far only one filter is applied.

## Link
* Link to Heroku Page [Heroku Face Filter App](https://heroku-face-filter.herokuapp.com/)
* Link to Github Backend [Github Backend](https://github.com/androi7/ml5-backend)

## Functionalities
1. Go to *Video* and wait till the webcam stream is loaded
2. Take a photo as soon as the filter is applied on top of your stream by clicking the camera symbol
3. You get a bunch of possible photos you have to choose one of it by clicking it
4. The photo will be stored in your gallery and can from now on used in the chat application
5. You can chat with other people and share your photo by clicking the symbol which will load your gallery

## Bugs
- sometimes user has to enable the webcam settings manually without getting a popup
- the images are not always getting stored in the cloudinary API
- webcam needs a while to showing up and the ml5 library needs a lot of CPU capacity that's why the computer can get overloaded
- when taking a photo you have to choose between a variety of possible pictures because so far it wasn't able to garantee to get a screenshot with the applied filter at a specific time
- when using the chat app and you want to share a photo, you have to click on one to close the mini gallery
