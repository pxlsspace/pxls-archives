import argparse
import json

argparser = argparse.ArgumentParser(description='Generates general statistics based on log files')
argparser.add_argument('--canvas', default='N', help='Canvas code')
# default is palette 12
argparser.add_argument('--palette', default='["#FFFFFF","#C2CBD4","#858D98","#4B4F58","#22272D","#000000","#38271D","#6C422C","#BC7541","#FFB27F","#FFD6BF","#FEB2D9","#F854CF","#C785F3","#9C29BC","#562972","#1E1E5B","#153FA2","#1C95DF","#A0E8FF","#17A8A3","#226677","#094C45","#278242","#43C91E","#B7F954","#FFFFAF","#FAE70F","#FEA815","#EA5B15","#5A0400","#990700","#D81515","#FF635E"]', help='Palette JSON string')
argparser.add_argument('--src', default='data/pixels.log', help='Source log file')
argparser.add_argument('--dst', default='out/stats.csv', help='Destination statistics file')
args = argparser.parse_args()

args.palette = json.loads(args.palette)

users = {}

def main():
    with open(args.src, 'r') as file:
        for line in file:
            line = line.strip()
            [date, username, x, y, color, action] = line.split('\t')
            if username not in users:
                users[username] = {
                    'pixels': 0,
                    'undone': 0,
                    'rolled_back': 0,
                    'colors': {
                        '255': 0
                    }
                }
                for i in range(len(args.palette)):
                    users[username]['colors'][str(i)] = 0
            if action == 'user place':
                users[username]['pixels'] += 1
                users[username]['colors'][color] += 1
            elif action == 'user undo':
                users[username]['pixels'] -= 1
                users[username]['undone'] += 1
                users[username]['colors'][color] -= 1
            elif action == 'rollback':
                users[username]['pixels'] -= 1
                users[username]['rolled_back'] += 1
                users[username]['colors'][color] -= 1
            elif action == 'rollback undo':
                users[username]['pixels'] += 1
                users[username]['rolled_back'] -= 1
                users[username]['colors'][color] += 1

    # TODO: Do something with all of the data


if __name__ == '__main__':
    main()
