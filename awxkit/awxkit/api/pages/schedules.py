from contextlib import suppress

from awxkit.api.pages import SystemJobTemplate
from awxkit.api.mixins import HasCreate
from awxkit.api.resources import resources
from awxkit.config import config
import awxkit.exceptions as exc

from . import page
from . import base


class Schedule(HasCreate, base.Base):
    dependencies = [SystemJobTemplate]
    NATURAL_KEY = ('unified_job_template', 'name')

    def silent_delete(self):
        """
        In every case, we start by disabling the schedule
        to avoid cascading errors from a cleanup failure.
        Then, if we are told to prevent_teardown of schedules, we keep them
        """
        try:
            self.patch(enabled=False)
            if not config.prevent_teardown:
                return self.delete()
        except (exc.NoContent, exc.NotFound, exc.Forbidden):
            pass


page.register_page([resources.schedule, resources.related_schedule], Schedule)


class Schedules(page.PageList, Schedule):
    def get_zoneinfo(self):
        return SchedulesZoneInfo(self.connection).get()

    def preview(self, rrule=''):
        payload = dict(rrule=rrule)
        return SchedulesPreview(self.connection).post(payload)

    def add_credential(self, cred):
        with suppress(exc.NoContent):
            self.related.credentials.post(dict(id=cred.id))

    def remove_credential(self, cred):
        with suppress(exc.NoContent):
            self.related.credentials.post(dict(id=cred.id, disassociate=True))

    def add_label(self, label):
        if isinstance(label, page.Page):
            label = label.json
        with suppress(exc.NoContent):
            self.related.labels.post(label)


page.register_page([resources.schedules, resources.related_schedules], Schedules)


class SchedulesPreview(base.Base):

    pass


page.register_page(((resources.schedules_preview, 'post'),), SchedulesPreview)


class SchedulesZoneInfo(base.Base):
    def __getitem__(self, idx):
        return self.json[idx]


page.register_page(((resources.schedules_zoneinfo, 'get'),), SchedulesZoneInfo)
