<script>
  import Count from "./Count.svelte";
  import Activity from "./Activity.svelte";
  import Relay from "./Relay.svelte";
  import Dots from "./Dots.svelte";
  import Tweet from "./Tweet.svelte";
  import Kind from "./Kind.svelte";

  import _ from "underscore";
  import Pie from "svelte-chartjs/src/Pie.svelte";

  // initial dummy event object
  let tweets = [];

  let eventCount24h = 0;
  let eventCount1h = 0;
  let networkActivity = Array(24).fill(0); // array index is hour

  let kindArr = [0, 0, 0, 0, 0, 0];

  let pieData = {
    labels: [
      "metadata",
      "tweet",
      "relay share",
      "contact list",
      "encrypted msg",
      "other",
    ],
    datasets: [
      {
        label: "Event types",
        data: kindArr,
        backgroundColor: [
          "hsl(326, 85%, 90%)",
          "hsl(267, 85%, 90%)",
          "hsl(207, 85%, 90%)",
          "hsl(147, 85%, 90%)",
          "hsl(87, 85%, 90%)",
          "hsl(27, 85%, 90%)",
        ],
      },
    ],
  };

  const unixTime = Math.floor(Date.now() / 1000);
  const unixTimeMinus24h = unixTime - 60 * 60 * 24;
  const unixTimeMinus1h = unixTime - 60 * 60;

  // taken from github.com/fiatjaf/nostr-relay-registry
  const relays = [
    "wss://nostr-pub.wellorder.net",
    "wss://relayer.fiatjaf.com",
    "wss://nostr.rocks",
    "wss://rsslay.fiatjaf.com",
    "wss://freedom-relay.herokuapp.com/ws",
    "wss://nostr-relay.freeberty.net",
    "wss://nostr.bitcoiner.social",
    "wss://nostr-relay.wlvs.space",
    "wss://nostr.onsats.org",
    "wss://nostr-relay.untethr.me",
    "wss://nostr-verified.wellorder.net",
    "wss://nostr.drss.io",
    "wss://nostr.unknown.place",
  ];
  let relayActivity = Array(relays.length).fill(0);

  relays.forEach((url, relayIndex) => {
    let socket = new WebSocket(url);

    socket.onopen = function (event) {
      console.log(`Connected to ${url}`);

      // pull all event 24h
      socket.send(
        JSON.stringify(["REQ", "foobar", { since: unixTimeMinus24h }])
      );
    };

    // // take data and parse here
    socket.onmessage = function (incomingPayload) {
      // spits out lots of error when parsing
      // Uncaught SyntaxError: Unexpected token P in JSON at position 0
      const payload = JSON.parse(incomingPayload.data);
      const event = payload[2];
      const eventDate = new Date(event.created_at * 1000);

      // count total event
      eventCount24h++;
      if (event.created_at > unixTimeMinus1h) eventCount1h++;

      // count kinds
      if (event.kind == "0") kindArr[0]++; // metadata
      else if (event.kind == "1") kindArr[1]++; // tweet
      else if (event.kind == "2") kindArr[2]++; // relay share
      else if (event.kind == "3") kindArr[3]++; // contact list
      else if (event.kind == "4") kindArr[4]++; // private messages
      else kindArr[5]++;
      pieData = pieData; // super heavy operation...

      // count peak event
      const eventHour = eventDate.getUTCHours();
      networkActivity[eventHour]++;

      // count relay activity
      relayActivity[relayIndex]++;

      // show tweets
      let tweet = {
        message: event.content,
        time: parseInt(event.created_at),
        id: event.id,
        pubkey: event.pubkey,
      };

      // todo: bug: still display duplicate tweets at time
      tweets.push(tweet);
      const uniqueTweets = _.uniq(tweets, tweet => tweet.time);
      const sortedTweets = _.sortBy(uniqueTweets, "time");
      tweets = sortedTweets.reverse().slice(0, 20);
    };
  });
</script>

<section class="bg-gradient-to-r from-pink-100 to-orange-200">
  <div class="p-2 max-w-3xl mx-auto sm:flex sm:space-x-4 space-y-2 sm:space-y-0">
    <div class="sm:w-1/2 space-y-2 sm:space-y-4">
      <Count {eventCount1h} {eventCount24h} />

      <!-- pie kind component -->
      <div class="rounded-md shadow p-3 bg-white">
        <span class="block text-center pb-3 text-sm text-neutral-400 font-mono"
          >EVENT TYPES (24H)</span
        >
        <Pie data={pieData} />
      </div>

      <Activity {networkActivity} />
      <Relay {relays} {relayActivity} />
    </div>

    <div class="rounded-md shadow p-3 bg-white sm:w-1/2">
      <span class="block text-center pb-3 text-sm text-neutral-400 font-mono"
        >NOSTR NETWORK'S LATEST EVENTS</span
      >
      <div class="flex flex-col">
        {#each tweets as tweet}
          <Tweet
            time={tweet.time}
            pubkey={tweet.pubkey}
            message={tweet.message}
          />
        {/each}
      </div>
    </div>
  </div>
</section>
