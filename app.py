import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np

from flask import Flask, jsonify


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


@app.route("/survived/")
@app.route("/survived/<class>")
def precipitation():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passengers who survived/did not survive by passenger class """
    session = Session(engine)
    results = session.query(Passenger.pclass, Passenger.survived).all()

    session.close()

    # Parse results
    results_dict = {"1st": [], 
                    "2nd": [], 
                    "3rd": []}

    # Create a dictionary from the row data and append to a list
    for pclass, survived in results:
        results_dict[pclass].append(survived)
    results_dict

    return jsonify(results_dict)

if __name__ == '__main__':
    app.run(debug=True)
