import argparse
import re

argparser = argparse.ArgumentParser(description='Sanitizes IP addresses from a Pxls log file.')
argparser.add_argument('file', help='The log file.')
argparser.add_argument('--old', action='store_true', default=False)
args = argparser.parse_args()

ip_re = r'((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])))'

def main():
    """
    Sanitizes and reformats ancient log files.
    """
    lines = []
    with open(args.file) as file:
        for line in file:
            line = line.strip()
            if args.old:
                if 'Clearing old sessions' in line:
                    continue
                groups = line.split(' ')
                corrected = []
                # Correct date/time
                corrected.append(groups[0] + ' ' + groups[1])
                groups = groups[2:]
                # Correct any usernames with spaces
                username = ''
                nums = []
                groups_copy = list(groups)
                for i in range(len(groups)):
                    group = groups_copy[i]
                    try:
                        int(group)
                        nums.append(group)
                    except:
                        if len(nums) > 0:
                            break
                        username += ' ' + group
                        groups.pop(0)
                        continue
                nums = nums[:-3]
                for _ in range(len(nums)):
                    groups.pop(0)
                corrected.append(username.strip() + ' ' + ' '.join(nums))
                # print(corrected, groups, nums)
                # Add x/y/color
                corrected.extend(groups[:3])
                groups = groups[3:]
                action = 'user place'
                if len(groups) > 0:
                    if groups[0] == '(user':
                        # Undo
                        action = 'user undo'
                    elif groups[0] == 'rollback':
                        # Rollback
                        if len(groups) == 2 and groups[1] == 'undo':
                            action = 'rollback undo'
                        else:
                            action = 'rollback'
                    elif len(groups) == 3:
                        # IP, empty, (mod)
                        action = 'mod overwrite'
                corrected.append(action)
                lines.append('\t'.join(corrected))
            else:
                line = re.sub(ip_re + r'\t', '', line)
                lines.append(line)
    with open(args.file, 'w') as file:
        file.writelines([line + '\n' for line in lines])
            

if __name__ == '__main__':
    main()
