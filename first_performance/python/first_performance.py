# data sonification of http://www.archivochile.com/Derechos_humanos/doc_gen_ddhh/hhdddocgen0001.pdf

import csv
import midiutil
import numpy
#from scipy import stats

all_data = []

# array where each item [i] is a person
with open('detenidos_desaparecidos_edit_smaller.csv', newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        all_data.append(row)
    print (all_data)

# map age and place to note and volume accordingly
def get_note(age):
    minor_scale = [60, 62, 63, 65, 67, 68, 70]
    scale = minor_scale

    # using phrygian mode [E, F, G, A, B, C, D]
    #scale = [52, 53, 55, 57, 59, 60, 62]

    if 10 <= age and age < 20:
        return scale[0]
    if 21 <= age and age < 30:
        return scale[1]
    if 31 <= age and age < 40:
        return scale[2]
    if 41 <= age and age < 50:
        return scale[3]
    if 51 <= age and age < 60:
        return scale[4]
    if 61 <= age and age < 70:
        return scale[5]
    else:
        return scale[6]


def get_volume(place):
    volume = [40, 70, 110, 60, 50, 127]
    if 'En su casa' in place:
        return volume[0]
    if 'En la calle' in place:
        return volume[1]
    if 'Paso fronterizo' in place:
        return volume[4]
    if 'Lugar de trabajo' in place:
        return volume[2]
    if 'Casa de amigos' in place:
        return volume[3]
    else:
        return volume[5]

# create midi file
midi_output = 'testing_small_65.mid'

#function to save midi
def save_midi(midi_file):
    filename = midi_output
    with open(filename, 'wb') as output_file:
        midi_file.writeFile(output_file)
        print('midi file saved')

# function to compose midi
def compose_midi(x):
    track = 0
    channel = 0
    time = 0 # in beats
    tempo = 60  # beats per minute
    volume = 0 # from 0-127
    program = 0 # Midi instrument
    duration = 1
    midi_file = midiutil.MIDIFile(1, adjust_origin=False)
    midi_file.addTempo(track, time, tempo)
    midi_file.addProgramChange(track, channel, time, program)
    midi_file.addProgramChange(track, channel+1, time, 65)
    for item in range (len(x)):
        volume = get_volume(x[item][3])
        note = get_note(int(x[item][2]))
        midi_file.addNote(track, channel, note, time, duration, volume)
        time = time + duration
    #execute funtion to save midi
    save_midi(midi_file)
#execute function to compose midi
compose_midi(all_data)
