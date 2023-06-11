from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Event, Rank
from database.schemas import events_schema

class StudentResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        available_classes = Event.query.all()
        available_classes_data = events_schema.dump(available_classes)

        return {'available_classes': available_classes_data}, 200


class StudentCheckInResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)

        event_id = request.json.get('event_id')
        pin = request.json.get('pin')

        if not event_id or not pin:
            return {'message': 'Invalid request'}, 400

        enrolled_event = Event.query.get(event_id)
        if not enrolled_event:
            return {'message': 'Invalid event ID'}, 404

        if enrolled_event not in user.user_event:
            return {'message': 'You are not enrolled in this event'}, 400

        if user.pin != pin:
            return {'message': 'Invalid pin'}, 401

        # Perform the check-in logic
        # Update the user's point_total based on the event's points
        user.point_total += enrolled_event.points

        # Check if the user has accumulated enough points for a promotion
        if user.point_total >= user.rank.points_required:
            # Find the next rank based on the current rank's ID
            next_rank = Rank.query.filter_by(id=user.rank_id + 1).first()

            if next_rank:
                # Update the user's rank and reset their point_total
                user.rank = next_rank
                user.point_total = 0

                # Commit the changes to the database
                db.session.commit()

                return {
                    'message': 'Check-in successful',
                    'rank': next_rank.title  # Include the new rank in the response
                }, 200

        return {'message': 'Check-in successful'}, 200



class EventEnrollmentResource(Resource):
    @jwt_required()
    def post(self, event_id):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)

        event = Event.query.get_or_404(event_id)

        # Check if the user is already enrolled in the event
        if event in user.user_event:
            return {'message': 'You are already enrolled in this event'}, 400

        # Enroll the user in the event
        user.user_event.append(event)
        db.session.commit()

        return {'message': 'Enrollment successful'}, 200





