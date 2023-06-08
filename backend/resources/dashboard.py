from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User
from database.schemas import users_schema

class CoachDashboardResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_info = User.query.all()
        return users_schema.dump(user_info), 200
    
    