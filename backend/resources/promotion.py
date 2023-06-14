from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Rank, Promotion
from database.schemas import promotions_schema, promotion_schema


class PromoteStudentResource(Resource):
    @jwt_required()
    def post(self):
        coach_id = get_jwt_identity()
        coach = User.query.get(coach_id)
        if coach.is_coach:

            form_data = request.get_json()
            new_promotion = promotion_schema.load(form_data)
            new_promotion.user_id = coach_id
            db.session.add(new_promotion)
            
            # user_id = request.json.get("user_id")
            # rank_id = request.json.get("rank_id")
            # user = User.query.get(user_id)
            # rank = Rank.query.get(rank_id)
            # user.rank_id = rank_id
            # user.promotions.append(rank)
            

            db.session.commit()
            return promotion_schema.dump(new_promotion)
        
        return {"message": ""}, 401


    








