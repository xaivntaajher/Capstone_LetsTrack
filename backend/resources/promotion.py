from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Rank
from database.schemas import promotions_schema, promotion_schema


class PromoteStudentResource(Resource):
    @jwt_required()
    def post(self, rank_id):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        rank = Rank.query.get(rank_id)
        user.promotion.append(rank)
        db.session.commit()
        return promotion_schema.dump(rank)

class StudentPromotionResource(Resource):
    @jwt_required()
    def get(self):
        promotions = db.session.query(User.promotion).all()
        promotion_data = promotions_schema.dump(promotions)
        return {'promotions': promotion_data}, 200
    








