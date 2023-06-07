from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    is_coach = fields.Boolean(required=True)
    start_date = fields.Date(required=True)
    last_promotion = fields.Date(required=True)
    point_total = fields.Integer(required=True)
    rank_id = fields.Integer()
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "is_coach", "start_date", "last_promotion", "point_total", "rank_id")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below

class EventSchema(ma.Schema):

    id = fields.Integer(primary_key=True)
    is_class = fields.Boolean(required=True)
    points = fields.Integer(required=True)
    title = fields.String(required=True)
    date = fields.Date(required=True)
    capacity = fields.Integer(required=True)

    class Meta:
        fields = ("id", "is_class", "points", "title", "date", "capacity")

class UserEventSchema(ma.Schema):
 
    id = fields.Integer(primary_key=True)
    user_id = fields.Integer(required=True)
    event_id = fields.Integer(required=True)

    class Meta:
        fields = ("id", "is_class", "points", "title", "date", "capacity")