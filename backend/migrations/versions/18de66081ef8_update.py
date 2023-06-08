"""update

Revision ID: 18de66081ef8
Revises: 7282bb328114
Create Date: 2023-06-08 12:48:41.823783

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '18de66081ef8'
down_revision = '7282bb328114'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=True)
        batch_op.alter_column('capacity',
               existing_type=mysql.INTEGER(),
               nullable=True)

    with op.batch_alter_table('promotion', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=True)

    with op.batch_alter_table('rank', schema=None) as batch_op:
        batch_op.alter_column('points_required',
               existing_type=mysql.INTEGER(),
               nullable=True)
        batch_op.alter_column('is_child_rank',
               existing_type=mysql.TINYINT(display_width=1),
               nullable=True)

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('start_date',
               existing_type=sa.DATE(),
               nullable=True)
        batch_op.alter_column('last_promotion',
               existing_type=sa.DATE(),
               nullable=True)
        batch_op.alter_column('point_total',
               existing_type=mysql.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('point_total',
               existing_type=mysql.INTEGER(),
               nullable=False)
        batch_op.alter_column('last_promotion',
               existing_type=sa.DATE(),
               nullable=False)
        batch_op.alter_column('start_date',
               existing_type=sa.DATE(),
               nullable=False)

    with op.batch_alter_table('rank', schema=None) as batch_op:
        batch_op.alter_column('is_child_rank',
               existing_type=mysql.TINYINT(display_width=1),
               nullable=False)
        batch_op.alter_column('points_required',
               existing_type=mysql.INTEGER(),
               nullable=False)

    with op.batch_alter_table('promotion', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=False)

    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.alter_column('capacity',
               existing_type=mysql.INTEGER(),
               nullable=False)
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=False)

    # ### end Alembic commands ###
