import json

with open('cinema.json') as f:
    data = json.load(f)

counter = 0

map_movies = []
map_actors = {}

map = {
    "movies": map_movies,
    "actors": []
}

for movie in data["movies"]:
    movie['id'] = counter
    map_movies.append(movie)
    counter += 1

    for actor in movie["cast"]:
        if actor not in map_actors:
            map_actors[actor] = []
        map_actors[actor].append(movie["title"])

for actor, movies in map_actors.items():
    map["actors"].append({
        "name": actor,
        "movies": movies
    })
    
with open('cinemaFormat.json', 'w') as f:
    json.dump(map, f, indent=4, ensure_ascii=False)