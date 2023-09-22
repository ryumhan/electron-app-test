from zeroconf import ServiceBrowser, Zeroconf
import socket
import time
from threading import Thread
import json

class MyListener:
    def remove_service(self, zeroconf, type, name):
        pass  # We don't need to handle service removal

    def add_service(self, zeroconf, type, name):
        # Get the ServiceInfo object
        info = zeroconf.get_service_info(type, name)

        # Extract IP addresses from the addresses attribute
        addresses = [socket.inet_ntoa(addr) for addr in info.addresses]

        # Extract the port
        port = info.port

        discovered_services.append((name, addresses, port))

    def update_service(self, zeroconf, type, name):
        pass

ip_range = "198.18."
ip_send = "127.0.0.1"
port_send = 64001
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def send_ORU_info():
        
    new_data = 0
    send_data = {}
    while True:
        t_s = int(time.time_ns() * 1000)
        
        if is_new == True:
            new_data = 1
        elif is_new == False:
            new_data = 0
            
        send_data = {"new_oru":new_data,"oru_ip":saved_ip}
        json_send = json.dumps(send_data)
        sock.sendto(json_send.encode('utf-8'),(ip_send,port_send))
        # print(send_data)
        t_e = int(time.time_ns() * 1000)
        
        if (t_e - t_s) < 1000:
            time.sleep((1000 - (t_e - t_s)) / 1000)
        elif (t_e - t_s) > 1000:
            time.sleep(1000 / 1000)

# Define the IP range you want to search within
start_ip = "198.18.0.1"
end_ip = "198.18.255.255"

# Convert the start and end IP addresses to integers for comparison
start_ip_int = int.from_bytes(socket.inet_aton(start_ip), byteorder='big')
end_ip_int = int.from_bytes(socket.inet_aton(end_ip), byteorder='big')

saved_ip = ""
is_saved = False
is_new = False
send_thread = Thread(target=send_ORU_info, args=())
send_thread.daemon = True
send_thread.start()

while True:
    # Create an empty list to store discovered services
    discovered_services = []

    # Create a Zeroconf object
    zeroconf = Zeroconf()

    # Specify the service type to discover (e.g., "_http._tcp.local.")
    service_type = "_http._tcp.local."

    # Create a listener to handle service discovery events
    listener = MyListener()

    # Browse for services of the specified type
    browser = ServiceBrowser(zeroconf, service_type, listener)

    # Set the duration (in seconds) to run the discovery
    duration = 1  # 10 seconds

    # Record the start time
    start_time = time.time()

    # Keep the script running for the specified duration
    while True:
        # Check if the specified duration has passed
        if time.time() - start_time >= duration:
            break
    # Clean up
    zeroconf.close()

    # Print the discovered services
    for service in discovered_services:
        if service[0][:7]=="NeuBoat":
            if is_saved == True:
                if saved_ip == service[1][0]:
                    print("Current NeuBoat system IP:",service[1][0])
                    is_new = False
                elif saved_ip != service[1][0]:
                    print("Changed NeuBoat system IP:",service[1][0])
                    saved_ip = service[1][0]
                    is_new=True
            elif is_saved == False:
                print("Found NeuBoat system IP:",service[1][0])
                saved_ip = service[1][0]
                is_saved = True
                is_new = True