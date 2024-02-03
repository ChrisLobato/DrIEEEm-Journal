from main import Flask, render_template,request, jsonify
app = Flask(__name__,template_folder='')
import gpt
@app.route("/", methods=['GET','POST'])
def main():


   return render_template('main.html')

@app.route("/image_gen",methods =['POST'])
def getImageGen():
   ImageGen = gpt.genImage(request.json['dream'],0.9)

   return ImageGen

def getText():
   TextGen = gpt.getDreamSynopsis(request.json['dream'],0.9)

   return TextGen

def getEmoji():
   EmojiGen = gpt.getDreamEmoji(request.json['dream'],0.9)

   return EmojiGen

if __name__ == "__main__":
    try :
      app.run(host= '0.0.0.0', port=8000, debug = True)
    finally: 
      print("done")