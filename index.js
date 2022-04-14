const express = require('express');
const app = express();
const cors = require('cors');
const Member = require('./models/member');
const Subscription = require('./models/subscription');

app.get('/api/members', cors(), async (_req, res) => {

  let subscriptions = [];
  let members = [];
  let membersWithSubscriptions = [];

  try {
    subscriptions = await Subscription.fetchAll();
  } catch (err) {
    res.json({ error: true, message: err.message });
  }

  try {
    members = await Member.fetchAll();
    const subscriptionsWithCount = subscriptions.map(
      sub => {
        return {
          ...sub.attributes,
          memberCount: members.filter(member => member.attributes.subscription_id === sub.id).length,
        }
      }
    );
    membersWithSubscriptions = members.map(member => {
      const memberSubscription = subscriptionsWithCount.find(sub => sub.id === member.attributes.subscription_id);
      return {
        ...member.attributes,
        subscription: { ...memberSubscription },
      };
    });
    res.json({ subscriptionsWithCount, membersWithSubscriptions });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on port: ' + port));

module.exports = app;
