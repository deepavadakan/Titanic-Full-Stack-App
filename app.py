import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine(f"sqlite:///titanic.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Passenger = Base.classes.passenger

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    
    return render_template("index.html")

@app.route("/age/")
@app.route("/age/<pclass>")
def age(pclass=None):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of ages of passengers by passenger class """

    # if no class option, return all passenger ages by class 
    if not pclass:
        results = session.query(Passenger.pclass, Passenger.age).all()

        session.close()

        # Parse results
        results_dict = {"1st": [], 
                        "2nd": [], 
                        "3rd": []}

        # Create a dictionary from the row data and append to a list
        for pclass, age in results:
            results_dict[pclass].append(age)
        return jsonify(results_dict)
   
    else:
        print(f"Selected class {pclass}")
        results = session.query(Passenger.age).filter(Passenger.pclass == pclass).all()
        session.close()

        results_dict = [age for age in np.ravel(results)]
        print(results_dict)
        return jsonify(results_dict)


@app.route("/survived/")
@app.route("/survived/<pclass>")
def survived(pclass=None):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passengers who survived/did not survive by passenger class """
    
    # if no class option, return  passenger count by class 
    if not pclass:
        results = session.query(Passenger.pclass, Passenger.survived, func.count(Passenger.pclass)).\
            group_by(Passenger.pclass, Passenger.survived).all()

        session.close()

        # Parse results
        results_dict = {"1st": [], 
                        "2nd": [], 
                        "3rd": []}

        # Create a dictionary from the row data and append to a list
        for pclass, survived, count in results:
            results_dict[pclass].append(count)

    else:
        results = session.query(Passenger.survived, func.count(Passenger.survived)).\
            filter(Passenger.pclass == pclass).\
            group_by(Passenger.survived).all()

        # Parse results
        results_dict = []

        for survived, count in results:
            results_dict.append(count)
        
    return jsonify(results_dict)


@app.route("/gender-class/")
def gender():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a summary of passdenger count by gender and passenger class """
    
    session = Session(engine)
    results = session.query(Passenger.pclass, Passenger.sex, Passenger.survived, func.count(Passenger.pclass)).\
        group_by(Passenger.pclass, Passenger.sex, Passenger.survived).all()

    # Parse results
    results_dict = {"1st": [],
                    "2nd": [],
                    "3rd": []}

    for pclass, gender, survival, count in results:
        results_dict[pclass].append(count)
    
    return jsonify(results_dict)

if __name__ == '__main__':
    app.run(debug=True)
