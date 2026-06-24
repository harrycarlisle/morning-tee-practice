# Morning Tee Practice Codex Context

This repo is the standalone Morning Tee Practice app.

Do not modify or connect:
- LifeOS
- morning-tee-radar-feed
- any unrelated Morning Tee repo

Morning Tee Practice is a separate product for morningtee.com.

Core product goal:
Help golfers practice with short guided drills, visual logging, and simple feedback.

This is not a generic tracker.
This is not a full golf coaching platform yet.
This is not a newsletter/radar feed.

MVP principle:
The user should get into a useful drill quickly.

Primary flow:
Hub
-> Putting
-> visual drill task
-> user hits the drill's putt count
-> user taps/adjusts finish markers
-> results
-> progress path unlock

UX rules:
- Mobile-first
- Very low text
- Visual before verbal
- No setup questionnaire before the first drill
- No long explanations on practice screens
- Use pucks, rings, markers, animation, and progress instead of paragraphs
- Keep buttons large and thumb-friendly
- No horizontal overflow
- Avoid Beehiiv iframe assumptions

Brand:
- Morning Tee identity
- Green: #40832B
- Cream/off-white backgrounds
- Near-black dark surfaces where needed
- Clean rounded cards
- Premium but approachable
- Simple, useful, lightly playful

Technical rules:
- Vite + React
- Local state first
- Supabase later, not before MVP is stable
- Keep scoring helpers separate from UI
- Keep components focused and readable
- Run lint and build before considering a task done

Future direction:
After MVP is stable:
1. Polish mobile UX
2. Add better animation
3. Add more adaptive putting drills
4. Add anonymous Supabase session logging
5. Add progress persistence
6. Add chipping
7. Add more practice paths
