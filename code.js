Webcam.set({
    width: 400,
    height: 300,
    img_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera")

function take_snapshot() {

    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='selfie_image' src = '" + data_uri + "' >"
    }
    )
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0tMUnNkY6/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!")
}

function check(){
    img = document.getElementById("selfie_image");
    classifier.classify(img, gotResult);
    console.log("check");

}

function speak(params) {
    var synth = window.speechSynthesis;
    prediction1_speech= "First prediction is " + prediction1;
    prediction2_speech= "Second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance (prediction1_speech + prediction2_speech);
    utterThis.rate = 0.5;
    synth.speak(utterThis)
}

function gotResult(error, results) {
        if (error) {
                console.log(error);
        }
        else{
            console.log(results);
            prediction1 = results[0].label;
            prediction2 = results[1].label;
            document.getElementById("result_emotion_name").innerHTML = prediction1;
            document.getElementById("result_emotion_name2").innerHTML = prediction2;
            
            icon1 = document.getElementById("update_emoji");
            icon2 = document.getElementById("update_emoji_2");
            speak();

            if (prediction1 == "like") {
                    icon1.innerHTML = "&#128077;";
            }

            if (prediction1 == "hi") {
                    icon1.innerHTML = "&#128075;";
            }

            if (prediction1 == "excellent") {
                    icon1.innerHTML = "&#128076;";
            }
            
            if (prediction2 == "like") {
                    icon2.innerHTML = "&#128077;";
            }

            if (prediction2 == "hi") {
                    icon2.innerHTML = "&#128075; ";
            }

            if (prediction2 == "excellent") {
                    icon2.innerHTML = "&#128076;";
            }

        }
}