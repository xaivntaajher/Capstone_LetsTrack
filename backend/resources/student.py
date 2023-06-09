from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Event
from database.schemas import users_schema, user_schema, userevents_schema

class StudentResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        available_classes = Event.query.all()
        enrolled_classes = User.query.filter_by(user_id=user_id).all()
        enrolled_classes_data = user_schema.dump(enrolled_classes)

        return jsonify({
            'available_classes': available_classes,
            'enrolled_classes': enrolled_classes_data,
         }), 200

class StudentReviewResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)

        pin = request.json.get('pin')
        event_id = request.json.get('event_id')

        if not pin or not event_id:
            return jsonify({'message': 'Invalid request'}), 400

        enrolled_class = User.query.filter_by(user_id=user_id, event_id=event_id).first()

        if not enrolled_class:
            return jsonify({'message': 'You are not enrolled in this class'}), 400

        if enrolled_class.pin != pin:
            return jsonify({'message': 'Invalid pin'}), 401

        db.session.commit()

        return jsonify({'message': 'Check-in successful'}), 200