from main import Flask, render_template,request, jsonify
app = Flask(__name__,template_folder='')
import gpt
@app.route("/image_gen",methods =['POST'])
def getImageGen():
   ImageGen = gpt.genImage(request.json['dream'])

   return ImageGen

@app.route("/image_text",methods =['POST'])
def getText():
   TextGen = gpt.getDreamSynopsis(request.json['dream'])

   return TextGen

@app.route("/image_emoji",methods =['POST'])
def getEmoji():
   EmojiGen = gpt.getDreamEmoji(request.json['dream'])

   return EmojiGen

if __name__ == "__main__":
    try :
      app.run(host= '0.0.0.0', port=7000, debug = True)
    finally: 
      print("done")