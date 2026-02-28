ansible-galaxy collection install git+https://github.com/k3s-io/k3s-ansible.git
ansible-playbook k3s.orchestration.site -i inventory.yaml -k -K --tags kubeconfig
