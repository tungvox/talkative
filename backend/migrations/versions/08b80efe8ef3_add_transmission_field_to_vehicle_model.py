"""Add transmission field to Vehicle model

Revision ID: 08b80efe8ef3
Revises: 
Create Date: 2024-06-08 20:43:12.397904

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '08b80efe8ef3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vehicles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('transmission', sa.String(length=50), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vehicles', schema=None) as batch_op:
        batch_op.drop_column('transmission')

    # ### end Alembic commands ###
