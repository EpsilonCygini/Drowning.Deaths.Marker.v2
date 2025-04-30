import json

# Path to your GeoJSON file
file_path = 'Agra_Villages.geojson'

# Load the GeoJSON file
with open(file_path, 'r') as f:
    geojson_data = json.load(f)

# Extract all unique village names
villages = set()

for feature in geojson_data['features']:
    village_name = feature['properties'].get('VILLAGE')
    if village_name:
        villages.add(village_name)

# Convert the set to a sorted list
villages_list = sorted(list(villages))

# Display the village names
for village in villages_list:
    print(village)

# Optionally, save the village names to a text file
with open('village_names.txt', 'w') as f:
    for village in villages_list:
        f.write(village + '\n')
