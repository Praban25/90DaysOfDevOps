Day 13 – Linux Volume Management (LVM)

Create free tier Instance - Ububtu
ssh to the instance

lsblk			--> List Block devices (nvmeOn1)
df -h			--> List the mount point

Go to console AWS - Volumes - create volumes - 2.4,6 gb each in same availability zone - action - attach 2 gb volume to the instance - use /dev/sdf as from F TO P its for data volume(check the note on console).

lsblk			--> to check newly device (look like as nvme1n1)

Same as other 2 drives also attach to the instance and check with lsblk

sudo su			--> To switch as Root user
lvm			--> To go inside LVM tool
pvs			--> to check physical volumes
pvcreate /dev/nvme1n1 /dev/nvme2n1 /dev/nvme3n1		--> To create Physical volume by using 3 volumes
pvs
vgcreate pk_vg /dev/nvme1n1 /dev/nvme2n1		--> To create volume group by using 2 physical voulmes
vgs			--> To check Volume group details
lvcreate -L 3G -n pk_lv pk_vg				--> To create logical volume (-L flag for volume size -n for name)
lvs			--> To check Logical volume details
pvdisplay		--> To get all physical volume details
vgdisplay		--> To get all Volume groups details
lvdisplay		--> To get all Logical volumes details
exit			--> to exit from lvm

Mounting :
mkdir /mnt/pk_lv_mount					--> Create mount directory to mount lv
mkfs.ext4 /dev/pk_vg/pk_lv				--> to format the LV before mounting
mount /dev/pk_vg/pk_lv /mnt/pk_lv_mount			--> to mount lv to the mounting point directory
umount /mnt/pk_lv_mount					--> to unmount the volume (can unmount and mount again. Data will remain as it is.. like USB drive)
lvextent -L +1G /dev/pk_vg/pk_lv			--> To add 1GB disk to the original LV
resize2fs /dev/pk_vg/pk_lv				--> To adjust newly added disk size in LV
df -h							--> To display and check volume size change

Mounting EBS volume :
mkdir /mnt/pk_disk_mount				--> Create mount directory to mount EBS disk
mkfs -t ext4 /dev/nvme3n1				--> to format the EBS disk before mounting
mount /dev/nvme3n1 /mnt/pk_disk_mount			--> to mount EBS disk to the mount point



Mounting through FSTAB :
lvdisplay						--> To get lv path
blkid /dev/pk_vg/pk_lv					--> To get UUID of the block device (LV)
cp /etc/fstab /etc/fstab.bak				--> To take fstab backup before proceeding
UUID=<your uuid no> /etc/pk_lv_mount ext4 default 0 2	--> this entry need to add in fstab
umount /mnt/pk_lv_mount					--> Unmount lv to test
systemctl daemon-reload					--> to reload deamon if its uses old one
mount -a						--> to re-read fstab and re-mount all volumes as per fstab entry
