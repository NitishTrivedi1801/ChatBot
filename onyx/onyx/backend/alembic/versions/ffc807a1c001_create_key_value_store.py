"""create key_value_store table

Revision ID: ffc807a1c001
Revises: 
Create Date: 2024-06-23 12:00:00.000000

"""

from alembic import op  # type: ignore
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import String, LargeBinary
import datetime

# revision identifiers, used by Alembic.
revision = 'ffc807a1c001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'key_value_store',
        sa.Column('key', sa.Text(), primary_key=True),
        sa.Column('value', sa.Text(), nullable=True),
        sa.Column('encrypted_value', sa.LargeBinary(), nullable=True),
        schema='public',
    )
    # Seed initial record
    kv_table = table(
        'key_value_store',
        column('key', sa.Text()),
        column('value', sa.Text()),
        column('encrypted_value', sa.LargeBinary()),
    )
    op.bulk_insert(
        kv_table,
        [
            {'key': 'customer_uuid', 'value': 'local-dev-customer', 'encrypted_value': None},
        ]
    )

def downgrade():
    op.drop_table('key_value_store', schema='public') 