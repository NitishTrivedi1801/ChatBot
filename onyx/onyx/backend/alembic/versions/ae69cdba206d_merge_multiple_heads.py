"""Merge multiple heads

Revision ID: ae69cdba206d
Revises: cec7ec36c505, ffc807a1c001
Create Date: 2025-06-23 20:14:00.467291

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ae69cdba206d"
down_revision = ("cec7ec36c505", "ffc807a1c001")
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
