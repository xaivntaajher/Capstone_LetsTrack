from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Event, Rank
from database.schemas import promotions_schema


class PromoteStudentResource(Resource):
    @jwt_required()
    def post(self, student_id):
        user_id = get_jwt_identity()
        coach = User.query.get_or_404(user_id)

 



class StudentPromotionResource(Resource):
    @jwt_required()
    def get(self):
        promotions = db.session.query(User.promotion).all()
        promotion_data = promotions_schema.dump(promotions)
        return {'promotions': promotion_data}, 200








