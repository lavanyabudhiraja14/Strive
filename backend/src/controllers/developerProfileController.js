const User = require("../models/user");
const axios = require("axios");
const cheerio = require("cheerio");

const getDeveloperProfile = async (req, res) => {
try {
const user = await User.findById(
req.user.id
);


let codeforces = {};
let leetcode = {};

let atcoder = {};
let codechef = {};

// CODEFORCES
if (user.codeforcesHandle) {
  try {
    const cfRes =
      await axios.get(
        `https://codeforces.com/api/user.info?handles=${user.codeforcesHandle}`
      );

    if (
      cfRes.data.status === "OK"
    ) {
      const cf =
        cfRes.data.result[0];

      codeforces = {
        rating:
          cf.rating || 0,
        maxRating:
          cf.maxRating || 0,
        rank:
          cf.rank || "N/A",
      };
    }
  } catch (error) {
    console.log(
      "Codeforces Error:",
      error.message
    );
  }
}

// LEETCODE
if (user.leetcodeHandle) {
  try {
    const query = {
      query: `
        query userContestRankingInfo($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
            }
          }

          userContestRanking(username: $username) {
            rating
          }
        }
      `,
      variables: {
        username:
          user.leetcodeHandle,
      },
    };

    const lcRes =
      await axios.post(
        "https://leetcode.com/graphql",
        query,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

    const stats =
      lcRes.data.data
        .matchedUser
        ?.submitStats
        ?.acSubmissionNum;

    leetcode = {
      solved:
        stats?.find(
          (s) =>
            s.difficulty ===
            "All"
        )?.count || 0,

      ranking:
        lcRes.data.data
          .matchedUser
          ?.profile
          ?.ranking || 0,

      contestRating:
        Math.round(
          lcRes.data.data
            .userContestRanking
            ?.rating || 0
        ),
    };
  } catch (error) {
    console.log(
      "LeetCode Error:",
      error.message
    );
  }
}


// ATCODER TEST
if (user.atcoderHandle) {
  try {
    const atcoderRes =
      await axios.get(
        `https://atcoder.jp/users/${user.atcoderHandle}`
      );

    const $ = cheerio.load(
      atcoderRes.data
    );

    const ratingText =
      $("th")
        .filter((i, el) =>
          $(el).text().includes("Rating")
        )
        .first()
        .next("td")
        .text()
        .trim();

    const ratingMatch =
      ratingText.match(/\d+/);

    atcoder = {
      rating:
        ratingMatch
          ? Number(ratingMatch[0])
          : 0,
    };

  } catch (error) {
    console.log(
      "AtCoder Error:",
      error.message
    );

    atcoder = {
      rating: 0,
    };
  }
}

// CODECHEF TEST
if (user.codechefHandle) {
  try {
    const ccRes =
      await axios.get(
        `https://www.codechef.com/users/${user.codechefHandle}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0",
          },
        }
      );

    const $ = cheerio.load(
      ccRes.data
    );

    const ratingText =
      $(".rating-number")
        .first()
        .text()
        .trim();

    const starsText =
      $(".rating")
        .first()
        .text()
        .trim();

    const ratingMatch =
      ratingText.match(/\d+/);

    codechef = {
      rating:
        ratingMatch
          ? Number(ratingMatch[0])
          : 0,

      stars:
        starsText || "N/A",
    };

  } catch (error) {
    console.log(
      "CodeChef Error:",
      error.message
    );

    codechef = {
      rating: 0,
      stars: "N/A",
    };
  }
}

res.json({
  user,
  codeforces,
  leetcode,
 
  atcoder,
  codechef,
});


} catch (error) {
res.status(500).json({
message:
error.message,
});
}
};

module.exports = {
getDeveloperProfile,
};
