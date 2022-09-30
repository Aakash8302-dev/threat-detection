import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase
from keras.models import load_model
from collections import deque
import matplotlib.pyplot as plt
import numpy as np
import cv2
import telepot
from datetime import datetime
import pytz
from PIL import Image
from PIL import ImageEnhance
import os
from matplotlib import pyplot
from matplotlib.patches import Rectangle
from matplotlib.patches import Circle
from mtcnn.mtcnn import MTCNN
from geopy.geocoders import Nominatim
import geocoder
from skimage.metrics import structural_similarity as ssim

loc = Nominatim(user_agent="GetLoc")
g = geocoder.ip('me')
latitude = g.latlng[0]
longitude = g.latlng[1]
geolocator = Nominatim(user_agent="geoapiExercises")

cred = credentials.Certificate(
    "threatdetecion-firebase-adminsdk-8lne6-e2740b87bd.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

config = {
    "apiKey": "#your_api_key",
    "authDomain": "threatdetecion.firebaseapp.com",
    "projectId": "threatdetecion",
    "databaseURL": "",
    "storageBucket": "threatdetecion.appspot.com",
    "messagingSenderId": "",
    "appId": "",
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
auth = firebase.auth()

# AUTHENTICATED GMAIL ACCOUNT & PASSWORD ONLY
email = ""
password = ""

user = auth.sign_in_with_email_and_password(email, password)


def getTime():
    IST = pytz.timezone('Asia/Kolkata')
    timeNow = datetime.now(IST)
    return timeNow


def imgenhance(filename):
    image1 = Image.open('savedImage.jpg')
    curr_bri = ImageEnhance.Sharpness(image1)
    new_bri = 1.3
    img_brightened = curr_bri.enhance(new_bri)
    im1 = img_brightened.save("bright.jpg")

    image2 = Image.open('bright.jpg')
    curr_col = ImageEnhance.Color(image2)
    new_col = 1.5
    img_col = curr_col.enhance(new_col)
    im2 = img_col.save(filename)


def draw_faces(filename, threat_face, result_list):
    # load the image
    data = pyplot.imread(filename)
    # plot each face as a subplot
    for i in range(len(result_list)):
        # get coordinates
        x1, y1, width, height = result_list[i]['box']
        x2, y2 = x1 + width, y1 + height
        # define subplot
        pyplot.subplot(1, len(result_list), i+1)
        pyplot.axis('off')
        # plot face
        pyplot.imshow(data[y1:y2, x1:x2])
    # show the plot
    pyplot.savefig(threat_face)
    pyplot.show()


def detect_image(filename, result_list):
    import cv2

# Read the input image
    img = cv2.imread("Image", filename)

# Convert into grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Load the cascade
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt2.xml')

# Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

# Draw rectangle around the faces and crop the faces
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 0, 255), 2)
        faces = img[y:y + h, x:x + w]
        cv2.imshow(faces)
        cv2.imwrite('face.jpg', faces)

# Display the output
    cv2.imwrite('faces.png', img)
    cv2.waitKey()


def mse(img1, img2):
    h1 = img1.shape[0]
    w1 = img1.shape[1]
    d1 = (h1, w1)
    d2 = (img2.shape[0], img2.shape[1])
    img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))
    d2 = (img2.shape[0], img2.shape[1])
    i1 = np.squeeze(img1)
    i2 = np.squeeze(img2)
    # s = ssim(i1, i2)
    err = np.sum((img1.astype("float") - img2.astype("float")) ** 2)
    err /= float(img1.shape[0] * img1.shape[1])
    # print("Value:", s)
    return err


def detectViolence(video, location, threat_image, threat_face, limit=None):
    trueCount = 0
    imageSaved = 0
    filename = 'savedImage.jpg'
    my_image = threat_image
    face_image = threat_face
    sendAlert = 0

    print("Model Running...")
    print("Location:", location)
    model = load_model('modelnew.h5')
    Q = deque(maxlen=128)
    vs = cv2.VideoCapture(video)
    writer = None
    (W, H) = (None, None)
    count = 0
    while True:
        (grabbed, frame) = vs.read()

        if not grabbed:
            break

        # if the frame dimensions are empty, grab them
        if W is None or H is None:
            (H, W) = frame.shape[:2]

        # clone the output frame, then convert it from BGR to RGB
        # ordering, resize the frame to a fixed 128x128, and then
        # perform mean subtraction

        output = frame.copy()

        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = cv2.resize(frame, (128, 128)).astype("float32")
        frame = frame.reshape(128, 128, 3) / 255

        # make predictions on the frame and then update the predictions
        # queue
        preds = model.predict(np.expand_dims(frame, axis=0))[0]
#             print("preds",preds)
        Q.append(preds)

        # perform prediction averaging over the current history of
        # previous
        results = np.array(Q).mean(axis=0)
        i = (preds > 0.50)[0]
        label = i

        text_color = (0, 255, 0)  # default : green

        if label:  # Violence prob
            text_color = (0, 0, 255)  # red
            trueCount = trueCount + 1

        else:
            text_color = (0, 255, 0)

        text = "Violence: {}".format(label)
        FONT = cv2.FONT_HERSHEY_SIMPLEX

        cv2.putText(output, text, (35, 50), FONT, 1.25, text_color, 3)

        # check if the video writer is None
        if writer is None:
            # initialize our video writer
            fourcc = cv2.VideoWriter_fourcc(*"MJPG")
            writer = cv2.VideoWriter(
                "recordedVideo.avi", fourcc, 30, (W, H), True)

        # write the output frame to disk
        writer.write(output)

        # show the output image
        cv2.imshow("Image", output)

        if(trueCount == 30):
            if(imageSaved == 0):
                if(label):
                    cv2.imwrite(filename, output)
                    imageSaved = 1

            if(sendAlert == 0):
                timeMoment = getTime()
                imgenhance(my_image)
                # load image from file
                pixels = pyplot.imread(my_image)
                # create the detector, using default weights
                detector = MTCNN()
                # detect faces in the image
                faces = detector.detect_faces(pixels)
                # display faces on the original image
                draw_faces(my_image, face_image, faces)

                #CODE FOR TELEGRAM BOT CONNECTIVITY
                storage.child(my_image).put(my_image)
                storage.child(face_image).put(face_image)

                # threshold_image = cv2.imread("threshold_image.png")
                # value = mse(face_image, threshold_image)
                # flag = "No"
                # if(value < 11000):
                #     flag = "Yes"
                url1 = storage.child(my_image).get_url(user['idToken'])
                url2 = storage.child(face_image).get_url(user['idToken'])
                db.collection("Information").add(
                    {'date': timeMoment, 'image': url1, 'faces': url2, 'location': location, 'Latitude': latitude, 'Longitude':  longitude})
                sendAlert = 1

        key = cv2.waitKey(1) & 0xFF

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break
    # release the file pointersq
    print("[INFO] cleaning up...")
    writer.release()
    vs.release()


detectViolence("V_19.mp4", "St.Joseph's ",
               "stj_threat_image.jpg", "stj_threat_face.png")
