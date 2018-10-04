import csv
import midiutil
import numpy
#from scipy import stats

# holds lists of rows from cvs file
all_data = []
# create midi file
midi_output = 'testing_duration.mid'

# array where each item [i] is a person
with open('detenidos_desaparecidos_edit_smaller.csv', newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        all_data.append(row)
    # print (all_data)

# map age and place to note and volume accordingly

def get_note(age):
    minor_scale = [60, 62, 63, 65, 67, 68, 70]
    scale = minor_scale

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
    volume = [30, 60, 127, 90, 45, 100]
    if 'En su casa' in place:
        return volume[0]
    if 'En la calle' in place:
        return volume[1]
    if 'Paso fronterizo' in place:
        return volume[2]
    if 'Lugar de trabajo' in place:
        return volume[3]
    if 'Casa de amigos' in place:
        return volume[4]
    else:
        return volume[5]

# def get_duration (time_value):
#    for item in range (len(time_value)):
#        time_value = 1804 - item*2
#        return time_value

def save_midi(midi_input):
    filename = midi_output
    with open(filename, 'wb') as output_file:
        midi_input.writeFile(output_file)
        print('midi file saved')

# function structure
def compose_midi(data_input):
    track = 0
    channel = 0
    time = 0 # in beats
    tempo = 60  # beats per minute
    volume = 100 # from 0-127
    program = 0 # Midi instrument
    duration = 2
    #duration = get_duration(all_data)
    midi_file = midiutil.MIDIFile(1, adjust_origin=False)
    midi_file.addTempo(track, time, tempo)
    midi_file.addProgramChange(track, channel, time, program)
    midi_file.addProgramChange(track, channel+1, time, 52)

    for item in range (len(data_input)):
        volume = get_volume(data_input[item][3])
        note = get_note(int(data_input[item][2]))
        duration = len(data_input)*2 - item*2
        track = item
        midi_file.addNote(track, channel, note, time, duration, volume)
        time = time + item*2
    # function executes
    save_midi(midi_file)
#function executes
compose_midi(all_data)
