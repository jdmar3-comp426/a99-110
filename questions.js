/* 
Im just writing some notes here for now, as well as some of my suggestions for how I imagine framing
all of the databases. Firstly, a database that requires a username, password, and email is necessary. 
As well as a database that requires a username, and "total score" value. 
Not too sure how you guys imagine "storing" the questions, but a standard json file will probably be sufficient. 
I imagine storing the questions in the following format: 

{
    "id": 0,
    "question": {
        "prompt": "What color is the sky?",
        "answer One": "Blue",
        "answer Two": "Light Blue",
        "answer Three": "Sky Blue",
        "answer Four": "Black"
    }
}
    or:

{
    "id": 0,
    "question": "What color is the sky?",
    "answer One": "Blue",
    "answer Two": "Light Blue",
    "answer Three": "Sky Blue",
    "answer Four": "Black"

}

    or:
{
    "id": 0,
    "questions":  "What color is the sky?",
    "answers": {
        "answer One": "Blue",
        "answer Two": "Light Blue",
        "answer Three": "Sky Blue",
        "answer Four": "Black"
    }

}

Whatever floats yall's boats
*/